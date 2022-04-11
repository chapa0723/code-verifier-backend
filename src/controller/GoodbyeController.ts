import { Get, Query, Route, Tags } from 'tsoa';
import { GoodbyeResponse } from './types';
import { IGoodbyeController } from './interfaces';
import { LogSuccess } from '../utils/logger';

const day = new Date();

@Route('api/goodbye')
@Tags('GoodbyeController')
export class GoodbyeController implements IGoodbyeController {
  /**
   * EndPoint to retreive a Massage "Hello {name}" in JSON
   * @param {string | undefined} name of user to be greeted
   * @returns {GoodbyeResponse} Promise of BasicResponse
   */
  @Get('/')
  public async getMessage(@Query()name?: string): Promise<GoodbyeResponse> {
    LogSuccess('[/api/goodbye] Get Request');

    return {
      message: `Goodbye ${name || 'Fulano'}`,
      date: 'Fecha Actual: ' + day.toString()
    }
  }
}
