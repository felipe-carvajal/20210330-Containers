import { LightningElement, wire, api, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import STATUS from '@salesforce/schema/Hangar_Update__c.status__c';
import STATUS_COLOR from '@salesforce/schema/Hangar_Update__c.colorurl__c';
import { refreshApex } from '@salesforce/apex';
//import RECORD_URL from '@salesforce/schema/Hangar_Update__c.recordidurl';
import { bikes } from 'c/data'; 
import getAllAircraftp from '@salesforce/apex/AircraftController.getAllAircrafts';
const fieldsz = [NAME_FIELD];
const FIELDS = ['Hangar_Update__c.status__c','Hangar_Update__c.colorurl__c',];
import IDEN_FIELD from '@salesforce/schema/den_Aircraft__c.Id';
import NOMBRE_FIELD from '@salesforce/schema/den_Aircraft__c.Name';
const COLUMNS = [
    { label: 'Id', fieldName: IDEN_FIELD.fieldApiName, type: 'text' },
    { label: 'Aircraft Name', fieldName: NOMBRE_FIELD.fieldApiName, type: 'text' },
];
export default class Container extends LightningElement {
    userId = Id;
    bikes = bikes;


    @api recordId;
    @wire(getRecord, { recordId: '$userId', fields: fieldsz })
    user;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    record;
    get name() {
        return getFieldValue(this.user.data, NAME_FIELD);
    }
    get status() {
        return getFieldValue(this.record.data, STATUS);
    }

    get statuscolor() {
        return getFieldValue(this.record.data, STATUS_COLOR);
    }
    columns = COLUMNS;
    @wire (getAllAircraftp) aircrafts;
    //({ error, data }) {
//        this.data = data;
//        if(this.data) {
//            let preparedAssets = [];
//            this.data.forEach(asset => {
/*                let preparedAsset = {};
                preparedAsset.Id = asset.id;
                preparedAsset.Name = asset.Name;
                preparedAssets.push(preparedAsset);
                window.console.log(preparedAssets)
            });
            this.data = preparedAssets;
            window.console.log(JSON.stringify(this.assets))
        } 
        else if (error) {
            this.error = error;
            this.data = undefined;
         }
        }*/
    
    
}