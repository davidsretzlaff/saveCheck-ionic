import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
//import {FileTransfer,FileUploadOptions} from '@ionic-native/file-transfer';
//import 'rxjs/add/operator/map';
var ProductService = /** @class */ (function () {
    function ProductService(http, transfer) {
        this.http = http;
        this.transfer = transfer;
    }
    ProductService.prototype.findAll = function () {
        return this.http.get(API_CONFIG.baseUrl + "/product");
    };
    ProductService.prototype.findByName = function (name) {
        return this.http.get(API_CONFIG.baseUrl + "/product/name/" + name);
    };
    ProductService.prototype.findById = function (id) {
        return this.http.get(API_CONFIG.baseUrl + "/product/" + id);
    };
    ProductService.prototype.findByBarcode = function (barcode) {
        return this.http.get(API_CONFIG.baseUrl + "/product/barcode/" + barcode);
    };
    ProductService.prototype.newProduct = function (product) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(API_CONFIG.baseUrl + "/product", product)
                .subscribe(function (result) {
                resolve(result);
            }, function (error) {
                console.log("ERRO na requisiçao", error.error);
                reject(error);
            });
        });
    };
    ProductService.prototype.newComment = function (comment) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put(API_CONFIG.baseUrl + "/product/comments/" + comment.productId, comment)
                .subscribe(function (result) {
                resolve(result);
            }, function (error) {
                console.log("ERRO na requisiçao", error.error);
                reject(error);
            });
        });
    };
    ProductService.prototype.deleteComment = function (comment) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put(API_CONFIG.baseUrl + "/product/deletecomments/" + comment.productId, comment)
                .subscribe(function (result) {
                resolve(result);
            }, function (error) {
                console.log("ERRO na requisiçao", error.error);
                reject(error);
            });
        });
    };
    ProductService.prototype.like = function (like) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put(API_CONFIG.baseUrl + "/product/like/" + like.brandId, like)
                .subscribe(function (result) {
                resolve(result);
            }, function (error) {
                console.log("ERRO na requisiçao", error.error);
                reject(error);
            });
        });
    };
    ProductService.prototype.dislike = function (like) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put(API_CONFIG.baseUrl + "/product/dislike/" + like.brandId, like)
                .subscribe(function (result) {
                resolve(result);
            }, function (error) {
                console.log("ERRO na requisiçao", error.error);
                reject(error);
            });
        });
    };
    ProductService.prototype.uploadImage = function (img, desc) {
        // Destination URL
        var url = API_CONFIG.baseUrl + '/product';
        // File for Upload
        var targetPath = img;
        var options = {
            fileKey: 'productImage',
            chunkedMode: false,
            mimeType: 'multipart/form-data',
            params: { 'desc': desc }
        };
        var fileTransfer = this.transfer.create();
        // Use the FileTransfer to upload the image
        return fileTransfer.upload(targetPath, url, options);
    };
    ProductService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, FileTransfer])
    ], ProductService);
    return ProductService;
}());
export { ProductService };
//# sourceMappingURL=product.service.js.map