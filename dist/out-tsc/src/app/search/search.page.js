import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ProductService } from 'src/services/domain/product.service';
import { API_CONFIG } from 'src/config/api.config';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from 'src/services/domain/brand.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/services/domain/storage.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
var SearchPage = /** @class */ (function () {
    function SearchPage(productService, brandService, router, loadingCtrl, toastCtrl, route, storage, androidPermissions, barcodeScanner) {
        this.productService = productService;
        this.brandService = brandService;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.route = route;
        this.storage = storage;
        this.androidPermissions = androidPermissions;
        this.barcodeScanner = barcodeScanner;
        this.like = {};
        this.imageUrl = API_CONFIG.baseUrl;
        this.comment = {};
        this.sections = {
            first: 'Products',
            second: 'Brands',
            selectedSection: ''
        };
    }
    SearchPage.prototype.ngOnInit = function () {
        this.usr = this.storage.getLocalUser();
        this.useScan = this.route.snapshot.paramMap.get('scan');
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
        if (this.useScan == 1) {
            this.scanCode();
        }
    };
    SearchPage.prototype.searchItens = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var val;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.search = ev;
                        val = ev.target.value;
                        if (!(val.length > 4)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.productService.findByName(val)
                                .subscribe(function (response) {
                                _this.products = response;
                                _this.sections.selectedSection = _this.sections.first;
                                return true;
                            }, function (error) {
                                _this.products = null;
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.brandService.findByName(val)
                                .subscribe(function (response) {
                                _this.brands = response;
                                _this.sections.selectedSection = _this.sections.second;
                            }, function (error) {
                                _this.brands = null;
                            })];
                    case 2:
                        _a.sent();
                        this.searched = true;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.likeBrand = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.like.email = this.usr.email;
                        this.like.brandId = id;
                        this.Succes = true;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.brandService.like(this.like)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        if (error_1.status != 201)
                            this.Succes = false;
                        this.presentToast(error_1.error.error);
                        return [3 /*break*/, 6];
                    case 5:
                        if (this.Succes) {
                            this.searchItens(this.search);
                            this.presentToast("Você curtiu isso");
                            this.comment.description = null;
                        }
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.likeProduct = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.like.email = this.usr.email;
                        this.like.brandId = id;
                        this.Succes = true;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.productService.like(this.like)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_2 = _a.sent();
                        if (error_2.status != 201)
                            this.Succes = false;
                        this.presentToast(error_2.error.error);
                        return [3 /*break*/, 6];
                    case 5:
                        if (this.Succes) {
                            this.searchItens(this.search);
                            this.presentToast("Você curtiu isso");
                            this.comment.description = null;
                        }
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.dislikeBrand = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.like.email = this.usr.email;
                        this.like.brandId = id;
                        this.Succes = true;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.brandService.dislike(this.like)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_3 = _a.sent();
                        if (error_3.status != 201)
                            this.Succes = false;
                        this.presentToast(error_3.error.error);
                        return [3 /*break*/, 6];
                    case 5:
                        if (this.Succes) {
                            this.searchItens(this.search);
                            this.comment.description = null;
                        }
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.dislikeProduct = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.like.email = this.usr.email;
                        this.like.brandId = id;
                        this.Succes = true;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.productService.dislike(this.like)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_4 = _a.sent();
                        if (error_4.status != 201)
                            this.Succes = false;
                        this.presentToast(error_4.error.error);
                        return [3 /*break*/, 6];
                    case 5:
                        if (this.Succes) {
                            this.searchItens(this.search);
                            this.comment.description = null;
                        }
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.scanCode = function () {
        var _this = this;
        this.searched = false;
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(function (result) { return console.log('Has permission?', result.hasPermission); }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.CAMERA); });
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.presentToast("Leitura do Código Completa");
            _this.barcodeData = barcodeData.text;
            _this.requestProduct();
        }).catch(function (err) {
            console.log('Error', err);
        });
    };
    SearchPage.prototype.requestProduct = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productService.findByBarcode(this.barcodeData)
                            .subscribe(function (response) {
                            _this.products = response;
                            return true;
                        }, function (error) {
                            _this.products = null;
                        })];
                    case 1:
                        _a.sent();
                        this.searched = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.segmentChanged = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var val;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.products = this.emptyProducts;
                        this.brands = this.emptyBrands;
                        val = event.target.value;
                        if (!(val == 'Products')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.productService.findAll()
                                .subscribe(function (response) {
                                _this.products = response;
                                return true;
                            }, function (error) {
                                _this.products = null;
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(val == 'Brands')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.brandService.findAll()
                                .subscribe(function (response) {
                                _this.brands = response;
                            }, function (error) {
                                _this.brands = null;
                            })];
                    case 3:
                        _a.sent();
                        this.searched = true;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({ message: 'Aguarde...' })];
                    case 1:
                        _a.loading = _b.sent();
                        return [2 /*return*/, this.loading.present()];
                }
            });
        });
    };
    SearchPage.prototype.presentToast = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({ message: message, duration: 2000 })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-search',
            templateUrl: './search.page.html',
            styleUrls: ['./search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ProductService,
            BrandService,
            Router,
            LoadingController,
            ToastController,
            ActivatedRoute,
            StorageService,
            AndroidPermissions,
            BarcodeScanner])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.page.js.map