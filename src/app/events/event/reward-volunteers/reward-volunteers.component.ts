import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from '../models/event.interface';
import { UserInterface } from '../../../auth/user.interface';
import { EventsService } from '../../services/events.service';
import { HeaderMessageService } from '../../../ui-elements/header-message/header-message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface BadgeCreateInterface {
  label: string;
  icon: string;
  value: number;
}

@Component({
  selector: 'app-reward-volunteers',
  templateUrl: './reward-volunteers.component.html',
  styleUrls: ['./reward-volunteers.component.scss']
})
export class RewardVolunteersComponent implements OnInit {
  @Input() event: EventInterface;
  volunteers: UserInterface[];
  badges = [
    {id: 0, icon: '001-medal.svg', label: 'badge', value: 0},
    {id: 1, icon: '028-badge-5.svg', label: 'badge', value: 0},
    {id: 2, icon: '003-star.svg', label: 'badge', value: 0},
    {id: 3, icon: '005-medal-1.svg', label: 'badge', value: 0},
    {id: 4, icon: '006-medal-2.svg', label: 'badge', value: 0},
    {id: 5, icon: '007-heart.svg', label: 'badge', value: 0},
    {id: 5, icon: '027-badge-4.svg', label: 'badge', value: 0},
    {id: 7, icon: '013-trophy.svg', label: 'badge', value: 0},
    {id: 8, icon: '015-diamond.svg', label: 'badge', value: 0},
    {id: 9, icon: '025-badge-2.svg', label: 'badge', value: 0},
    {id: 10, icon: '026-badge-3.svg', label: 'badge', value: 0},
  ];
  selectedBadges = [];
  selectedVolunteers = [];
  errors: { volunteers: boolean, badges: boolean } = {volunteers: false, badges: false};

  constructor(private eventsService: EventsService,
              private headerMessage: HeaderMessageService,
              private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.volunteers = this.event.activities.reduce((acc, activity) => {
      acc.push(...activity.participation.map(p => p.volunteer));
      return acc;
    }, []).filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t._id === thing._id && t._id === thing._id
      ))
    );
  }

  toggleBadge(badge) {
    const foundIndex = this.selectedBadges.findIndex(b => b.id === badge.id);
    if (foundIndex > -1) {
      this.selectedBadges.splice(foundIndex, 1);
      return;
    }
    this.selectedBadges.push(badge);
  }

  isBadgeSelected(badge): boolean {
    return this.selectedBadges.findIndex(b => b.id === badge.id) > -1;
  }

  onReward() {
    if (!this.selectedBadges.length || !this.selectedVolunteers.length) {
      if (!this.selectedVolunteers.length) {
        this.errors.volunteers = true;
      }

      if (!this.selectedBadges.length) {
        this.errors.badges = true;
      }
      setTimeout(() => {
        this.errors = {volunteers: false, badges: false};
      }, 3000);
      return;
    }
    const createBadges: BadgeCreateInterface[] = this.selectedBadges.map((badge) => {
      const {id, ...rest} = badge;
      return rest;
    });
    this.eventsService.rewardVolunteers(this.event._id, createBadges, this.selectedVolunteers).subscribe(() => {
      this.headerMessage.show('Volunteers reward succesfully', 'SUCCESS');
      this.activeModal.close();
    });
  }

  onCancel() {
    this.activeModal.close();
  }
}
