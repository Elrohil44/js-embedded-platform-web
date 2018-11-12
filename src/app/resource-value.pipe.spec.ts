import { ResourceValuePipe } from './resource-value.pipe';

describe('ResourceValuePipe', () => {
  it('create an instance', () => {
    const pipe = new ResourceValuePipe('en');
    expect(pipe).toBeTruthy();
  });
});
