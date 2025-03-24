import { WebsocketGuard } from './websocket.guard';

describe('WebsocketGuard', () => {
  it('should be defined', () => {
    expect(new WebsocketGuard()).toBeDefined();
  });
});
