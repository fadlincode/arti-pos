import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import { SettingService } from './admin/setting/setting.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Add folder static
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Add partial folder
  hbs.registerPartials(join(__dirname, '..', 'views'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views'));

  app.setViewEngine('hbs');

  // Set Setting Global Var
  const settings = app.get(SettingService);
  const globalSetting = await settings.findOne(1);
  const helpers = {
    appName: globalSetting.app_name,
    appDescription: globalSetting.app_description,
    appLogo: globalSetting.app_logo,
  };

  Object.entries(helpers).forEach(([helperName, envVariable]) => {
    hbs.registerHelper(helperName, () => envVariable);
  });

  // register math helper
  hbs.registerHelper('eval', function(...e) {      
    e.pop();
    const args = e.join('');
        return eval(args)  ;
    }
  );

  hbs.registerHelper("log", function(log) {
    return console.log(log);
  });

  await app.listen(3000);
}
bootstrap();
