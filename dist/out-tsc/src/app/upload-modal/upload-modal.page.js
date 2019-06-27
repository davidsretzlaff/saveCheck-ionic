import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { ProductService } from 'src/services/domain/product.service';
var UploadModalPage = /** @class */ (function () {
    function UploadModalPage(navCtrl, navParams, viewCtrl, imagesProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.imagesProvider = imagesProvider;
        this.imageData = this.navParams.get('data');
    }
    UploadModalPage.prototype.ngOnInit = function () {
    };
    // saveImage() {
    //   this.imagesProvider.newProduct(this.imageData, this.desc).then(res => {
    //     this.viewCtrl.dismiss({reload: true});
    //   }, err => {
    //     this.dismiss();
    //   });
    // }
    UploadModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    UploadModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-upload-modal',
            templateUrl: './upload-modal.page.html',
            styleUrls: ['./upload-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, NavParams, ModalController, ProductService])
    ], UploadModalPage);
    return UploadModalPage;
}());
export { UploadModalPage };
//# sourceMappingURL=upload-modal.page.js.map