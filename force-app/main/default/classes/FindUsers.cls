public with sharing class FindUsers {
    @AuraEnabled(cacheable=true)
    public static List<User> getAllUsers() {
        return [
            SELECT Id, Name, Title
            FROM User
            WHERE Title != NULL
            ];
    }
}