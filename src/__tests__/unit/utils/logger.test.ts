import Logger from '../../../utils/logger'

describe('Logger', () => {
  it('should log info messages', () => {
    const logSpy = jest.spyOn(Logger, 'info')
    Logger.info('Test message')
    expect(logSpy).toHaveBeenCalledWith('Test message')
  })

  it('should log error messages', () => {
    const logSpy = jest.spyOn(Logger, 'error')
    Logger.error('Test error')
    expect(logSpy).toHaveBeenCalledWith('Test error')
  })
})
