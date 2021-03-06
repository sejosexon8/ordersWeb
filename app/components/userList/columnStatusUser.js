System.register(['angular2/core', 'angular2/router', 'angular2/common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, common_1;
    var ColumnStatusUser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            ColumnStatusUser = (function () {
                function ColumnStatusUser(_router) {
                    this._router = _router;
                }
                ColumnStatusUser.prototype.ngTableOnInit = function (index, row) {
                    this.status = row.status;
                };
                ColumnStatusUser = __decorate([
                    core_1.Component({
                        directives: [common_1.CORE_DIRECTIVES],
                        selector: 'column-status-user',
                        template: "<div *ngIf=\"status == 'N'\">\n                    <div class=\"alert alert-warning\">\u010CEKA NA ODOBRENJE</div>\n               </div>\n               <div *ngIf=\"status == 'A'\">\n                    <div class=\"alert alert-success\">AKTIVAN</div>\n               </div>\n               <div *ngIf=\"status == 'S'\">\n                    <div class=\"alert alert-danger\">SUSPENDIRAN</div>\n               </div>"
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], ColumnStatusUser);
                return ColumnStatusUser;
            }());
            exports_1("ColumnStatusUser", ColumnStatusUser);
        }
    }
});
//# sourceMappingURL=columnStatusUser.js.map