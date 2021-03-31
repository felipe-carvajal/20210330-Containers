import { LightningElement, wire } from 'lwc';
import getAllAircraftp from '@salesforce/apex/AircraftController.getAllAircrafts';
export default class Test extends LightningElement {
    @wire (getAllAircraftp) aircrafts;
}