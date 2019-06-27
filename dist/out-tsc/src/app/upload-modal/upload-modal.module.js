import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UploadModalPage } from './upload-modal.page';
var routes = [
    {
        path: '',
        component: UploadModalPage
    }
];
var UploadModalPageModule = /** @class */ (function () {
    function UploadModalPageModule() {
    }
    UploadModalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UploadModalPage]
        })
    ], UploadModalPageModule);
    return UploadModalPageModule;
}());
export { UploadModalPageModule };
//# sourceMappingURL=upload-modal.module.js.map