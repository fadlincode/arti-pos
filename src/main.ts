import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Add folder static
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Add partial folder
  hbs.registerPartials(join(__dirname, '..', 'views'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views'));

  app.setViewEngine('hbs');

  // Set Global Var
  const helpers = {
    appName: 'APP_NAME',
    appDescription: 'APP_DESCRIPTION',
  };

  Object.entries(helpers).forEach(([helperName, envVariable]) => {
    hbs.registerHelper(helperName, () => process.env[envVariable]);
  });

  // register math helper
  hbs.registerHelper('eval', function(...e) {      
    e.pop();
    const args = e.join('');
        return eval(args)  ;
    }
  );

  await app.listen(3000);
}
bootstrap();
