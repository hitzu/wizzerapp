import { MessageRepository } from '../orm/repositories/MessageRepository';
import { getMessageById } from '../controllers/message.controller';

describe('Message Controller', () => {
  let req;
  let res;
  let messageRepository;

  beforeEach(() => {
    req = { params: { id: '1' } };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    messageRepository = {
      findOne: jest.spyOn(MessageRepository.prototype, 'findOne')
    };
  });

  test('getMessageById should return message object if found', async () => {
    messageRepository.findOne.mockResolvedValue({ id: '1', text: 'Hello' });

    await getMessageById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ id: '1', text: 'Hello' });
  });

  test('getMessageById should throw an error if message not found', async () => {
    messageRepository.findOne.mockResolvedValue(null);

    await getMessageById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('getMessageById should handle error and send 500 status', async () => {
    messageRepository.findOne.mockRejectedValue(new Error('Database error'));

    await getMessageById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(new Error('Database error'));
  });
});
