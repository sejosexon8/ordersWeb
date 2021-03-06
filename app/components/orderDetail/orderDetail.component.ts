import {Component, EventEmitter, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from 'angular2/common';

import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import {WrapperCmp} from "../header/header";
import {OrderItem} from "../../data/orderItem";
import {Router} from "angular2/router";
import {MyResourcesService} from "../../resources";
import {OrderService} from "../../services/order.service";
import {Observable} from "rxjs/Observable";
import {RouteParams} from "angular2/router";
import {Order} from "../../data/order";
import {ColumnButtonItem} from "../itemList/columnButtonItem";


@Component({
    selector: 'order-detail',
    templateUrl: 'app/components/orderDetail/orderDetail.component.html',
    directives: [WrapperCmp,NG_TABLE_DIRECTIVES, NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES,PAGINATION_DIRECTIVES]
})
export class OrderDetail implements OnInit {
    public rows:Array<any> = [];
    public columns:Array<any> = [
        {title: 'Naziv proizvoda', name: 'name'},
        {title: 'Cijena', name: 'price'},
        {title: 'Količina', name: 'amount'},
        {title: 'Mjera', name: 'measure'},
        {title: 'Kategorija', name: 'categoryName'},
        {title: 'Detalji', name: 'id', custom: ColumnButtonItem},
    ];
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 5;
    public numPages:number = 1;
    public length:number = 0;

    public config:any = {
        paging: true,
        sorting: false,
        filtering: false
    };


    public data: OrderItem[];
    public order = new Order('','','','','','');

    constructor(private _orderService: OrderService,
                private _routeParams: RouteParams,
                private _router: Router) {

        this.data = [];
    }

    goBack() {
        window.history.back();
    }

    ngOnInit() {

        this.getOrderDetails(this._routeParams.get('orderId'));
        this.getOrderItems(this._routeParams.get('orderId'));
    }

    getOrderItems(orderId: string) {
         return this._orderService.getOrderItems(orderId)
            .subscribe(
                (response) => {
                    this.data = response;
                    this.length = this.data.length;
                    this.onChangeTableInitial(this.config, null);
                },
                (err) => this._router.navigate(['Login'])
            );
    }

    getOrderDetails(orderId: string) {
        return this._orderService.getOrderDetails(orderId)
            .subscribe(
                (response) => {
                    this.order = response;
                },
                (err) => this._router.navigate(['Login'])
            );
    }

    changeOrderStatus(orderStatus: string) {

        return this._orderService.changeOrderStatus(this._routeParams.get('orderId'), orderStatus)
            .subscribe(
                (response) => {
                    this.getOrderDetails(this._routeParams.get('orderId'));
                },
                (err) => this._router.navigate(['Login'])
            );
    }

    changePage(page:any, data:any = this.data):Array<any> {
        //console.log(page);
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;

        console.log(page.page);
        console.log(page.itemsPerPage);

        return data.slice(start, end);
    }

    changeSort(data:any, config:any) {
        if (!config.sorting) {
            return data;
        }

        // simple sorting
        return data.sort((previous:any, current:any) => {
            let columns = this.config.sorting.columns || [];
            for (let i = 0; i < columns.length; i++) {
                let columnName = columns[i].name;

                if (previous[columnName] > current[columnName]) {
                    return columns[i].sort === 'desc' ? -1 : 1;
                }
                if (previous[columnName] < current[columnName]) {
                    return columns[i].sort === 'asc' ? -1 : 1;
                }
            }
            return 0;
        });
    }

    changeFilter(data:any, config:any):any {
        if (!config.filtering) {
            return data;
        }

        let filteredData:OrderItem[] = data.filter((item:OrderItem) =>
            item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));

        return filteredData;
    }

    onChangeTable(config:any, page:any = config.paging) {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = this.changePage(page, sortedData).slice(0,this.itemsPerPage);
        this.length = sortedData.length;
    }

    onChangeTableInitial(config:any, page:any = config.paging) {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData.slice(0,this.itemsPerPage);
        this.length = sortedData.length;
    }
}