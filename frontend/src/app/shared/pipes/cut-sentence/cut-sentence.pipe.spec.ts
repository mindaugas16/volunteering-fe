import { CutSentencePipe } from './cut-sentence.pipe';

describe('CutSentencePipe', () => {
  it('create an instance', () => {
    const pipe = new CutSentencePipe();
    expect(pipe).toBeTruthy();
  });
});
