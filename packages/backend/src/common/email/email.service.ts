import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { PennifyConfigService } from '../../config/pennify-config.service';

@Injectable()
export class EmailService {
  constructor(private pennifyConfigService: PennifyConfigService) {
    sgMail.setApiKey(this.pennifyConfigService.sendGridApiKey);
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html: string
  ): Promise<void> {
    const msg = {
      to,
      from: this.pennifyConfigService.sendGridFromEmail,
      subject,
      text,
      html,
    };

    await sgMail.send(msg);
  }
}
