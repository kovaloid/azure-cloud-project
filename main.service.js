angular
    .module('Main')
    .factory('MainService', ['$q', '$http',
        function MainService($q, $http) {
            
            function getAbout() {
                var deferred = $q.defer();
                $http.get('/about').then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
            
            function sendFeedback(data) {
                var deferred = $q.defer();
                $http.post('/feedback', data).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
            
            return {
                getAbout: getAbout,
                sendFeedback: sendFeedback
            }
        
        }]);