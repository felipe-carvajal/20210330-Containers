public with sharing class AircraftController {
    @AuraEnabled(cacheable=true)
    public static List<den_Aircraft__c> getAllAircrafts() {
        return [
            SELECT Id, Name
            FROM den_Aircraft__c
            LIMIT 10
            ];
    }
}