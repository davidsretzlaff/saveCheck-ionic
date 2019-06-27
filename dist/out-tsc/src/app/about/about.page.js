import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/services/domain/auth.service';
import { NavController } from '@ionic/angular';
var AboutPage = /** @class */ (function () {
    function AboutPage(authService, navCtr) {
        this.authService = authService;
        this.navCtr = navCtr;
    }
    AboutPage.prototype.ngOnInit = function () {
    };
    AboutPage.prototype.logout = function () {
        this.authService.logout();
        this.navCtr.navigateRoot('/login');
    };
    AboutPage = tslib_1.__decorate([
        Component({
            selector: 'app-about',
            templateUrl: './about.page.html',
            styleUrls: ['./about.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            NavController])
    ], AboutPage);
    return AboutPage;
}());
export { AboutPage };
//# sourceMappingURL=about.page.js.map