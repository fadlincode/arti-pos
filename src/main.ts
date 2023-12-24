import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import { SettingService } from './admin/setting/setting.service';
import { evalHelper, logHelper, numbering, showingPagination, ternary } from './helpers/sites';
import * as session from 'express-session';

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

    Object.entries(helpers).forEach(([helperName, settingVariable]) => {
        hbs.registerHelper(helperName, () => settingVariable);
    });

    // register helper
    hbs.registerHelper('eval', evalHelper);
    hbs.registerHelper('log', logHelper);
    hbs.registerHelper('ternary', ternary);
    hbs.registerHelper('numbering', numbering);
    hbs.registerHelper('showingPagination', showingPagination);


    // Express Session
    app.use(
        session({
            secret: 'nest-book',
            resave: false,
            saveUninitialized: false
        }),
    );

    app.use('/admin*', function(req, res, next){
        if (req.session.user) {
            res.locals.session = req.session;
            next();
        } else {
            res.redirect('/');
        }
    });

    await app.listen(3000);
}
bootstrap();
