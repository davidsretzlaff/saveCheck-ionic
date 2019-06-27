import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/domain/product.service';
import { BrandService } from 'src/services/domain/brand.service';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/domain/storage.service';
import { LoadingController, ToastController } from '@ionic/angular';
var DetailPage = /** @class */ (function () {
    function DetailPage(route, productService, brandService, storage, router, loadingCtrl, toastCtrl) {
        this.route = route;
        this.productService = productService;
        this.brandService = brandService;
        this.storage = storage;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.comment = {};
        this.like = {};
        this.imageUrl = API_CONFIG.baseUrl;
    }
    DetailPage.prototype.ngOnInit = function () {
        this.id = this.route.snapshot.paramMap.get('id');
        this.type = this.route.snapshot.paramMap.get('type');
        this.product = null;
        this.brand = null;
        this.usr = this.storage.getLocalUser();
        this.fillItens();
    };
    DetailPage.prototype.addCommentsProduct = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.comment.email = this.usr.email;
                        this.comment.productId = this.id;
                        this.Succes = true;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, 7, 8]);
                        if (!this.comment.description) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.productService.newComment(this.comment)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.Succes = false;
                        this.presentToast("Comentário inválido");
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        error_1 = _a.sent();
                        if (error_1.status != 201)
                            this.Succes = false;
                        this.presentToast(error_1.error.error);
                        return [3 /*break*/, 8];
                    case 7:
                        if (this.Succes) {
                            this.fillItens();
                            this.presentToast("Comentário adicionado");
                            this.comment.description = null;
                        }
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DetailPage.prototype.deleteCommentsProduct = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.comment.email = this.usr.email;
                        this.comment.productId = this.id;
                        this.comment._id = id;
                        this.Succes = true;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.productService.deleteComment(this.comment)];
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
                            this.fillItens();
                            this.presentToast("Comentário Excluído");
                            this.comment.description = null;
                        }
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DetailPage.prototype.addCommentsBrand = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.comment.email = this.usr.email;
                        this.comment.brandId = this.id;
                        this.Succes = true;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, 7, 8]);
                        if (!this.comment.description) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.brandService.newComment(this.comment)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.Succes = false;
                        this.presentToast("Comentário inválido");
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        error_3 = _a.sent();
                        if (error_3.status != 201)
                            this.Succes = false;
                        this.presentToast(error_3.error.error);
                        return [3 /*break*/, 8];
                    case 7:
                        if (this.Succes) {
                            this.fillItens();
                            this.presentToast("Comentário adicionado");
                            this.comment.description = null;
                        }
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DetailPage.prototype.deleteCommentsBrand = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.comment.email = this.usr.email;
                        this.comment.brandId = this.id;
                        this.comment._id = id;
                        this.Succes = true;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.brandService.deleteComment(this.comment)];
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
                            this.fillItens();
                            this.presentToast("Comentário Excluído");
                            this.comment.description = null;
                        }
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DetailPage.prototype.likeBrand = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.like.email = this.usr.email;
                        this.like.brandId = this.id;
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
                        error_5 = _a.sent();
                        if (error_5.status != 201)
                            this.Succes = false;
                        this.presentToast(error_5.error.error);
                        return [3 /*break*/, 6];
                    case 5:
                        if (this.Succes) {
                            this.fillItens();
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
    DetailPage.prototype.likeProduct = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.like.email = this.usr.email;
                        this.like.brandId = this.id;
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
                        error_6 = _a.sent();
                        if (error_6.status != 201)
                            this.Succes = false;
                        this.presentToast(error_6.error.error);
                        return [3 /*break*/, 6];
                    case 5:
                        if (this.Succes) {
                            this.fillItens();
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
    DetailPage.prototype.dislikeBrand = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.like.email = this.usr.email;
                        this.like.brandId = this.id;
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
                        error_7 = _a.sent();
                        if (error_7.status != 201)
                            this.Succes = false;
                        this.presentToast(error_7.error.error);
                        return [3 /*break*/, 6];
                    case 5:
                        if (this.Succes) {
                            this.fillItens();
                            this.comment.description = null;
                        }
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DetailPage.prototype.dislikeProduct = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.like.email = this.usr.email;
                        this.like.brandId = this.id;
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
                        error_8 = _a.sent();
                        if (error_8.status != 201)
                            this.Succes = false;
                        this.presentToast(error_8.error.error);
                        return [3 /*break*/, 6];
                    case 5:
                        if (this.Succes) {
                            this.fillItens();
                            this.comment.description = null;
                        }
                        this.loading.dismiss();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DetailPage.prototype.fillItens = function () {
        var _this = this;
        if (this.type == 2) {
            this.brandService.findById(this.id)
                .subscribe(function (response) {
                _this.brand = response;
            }, function (error) {
            });
        }
        if (this.type == 1) {
            this.productService.findById(this.id)
                .subscribe(function (response) {
                _this.product = response;
            }, function (error) {
            });
        }
    };
    DetailPage.prototype.presentLoading = function () {
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
    DetailPage.prototype.presentToast = function (message) {
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
    DetailPage = tslib_1.__decorate([
        Component({
            selector: 'app-detail',
            templateUrl: './detail.page.html',
            styleUrls: ['./detail.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            ProductService,
            BrandService,
            StorageService,
            Router,
            LoadingController,
            ToastController])
    ], DetailPage);
    return DetailPage;
}());
export { DetailPage };
//# sourceMappingURL=detail.page.js.map