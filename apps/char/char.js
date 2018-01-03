(function () {
    'use strict';
    angular
        .module('app')
        .filter('propsFilter', propsFilter)
        .controller('CharacterCtrl', CharacterCtrl);

    function propsFilter() {
        return filter;
        function filter(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                out = items;
            }

            return out;
        };
    }
    CharacterCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$window', '$state', 'editableOptions', 'editableThemes', 'toastr'];
    function CharacterCtrl($scope, $rootScope, $http, $filter, $window, $state, editableOptions, editableThemes, toastr) {

        editableOptions.theme = 'bs3';
        editableOptions.icon_set = 'font-awesome';
        editableThemes.bs3.inputClass = 'form-control-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';

        var url = SERVER_API + 'admin/characterList';
        $http.get(url, set_header(), {
            withCredentials: true
        }).then(function (response) {
            $scope.person = {};
            $scope.people = response.data.data;
        }, function (err) {
            $scope.isServerError = false;
        });

        $scope.onSelectCallback = function (item, model) {

            var url = SERVER_API + 'admin/characterDetail';

            var data = {
                name: item.Name,
                account: item.AccountID
            };

            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.char = response.data.data[0];

                $scope.char['Money'] = parseInt($scope.char.Money);
                $scope.char['Resets'] = parseInt($scope.char.Resets);
                $scope.char['cLevel'] = parseInt($scope.char.cLevel);
                $scope.char['Strength'] = parseInt($scope.char.Strength);
                $scope.char['Dexterity'] = parseInt($scope.char.Dexterity);
                $scope.char['Energy'] = parseInt($scope.char.Energy);
                $scope.char['Leadership'] = parseInt($scope.char.Leadership);
                $scope.char['Vitality'] = parseInt($scope.char.Vitality);
                $scope.char['LevelUpPoint'] = parseInt($scope.char.LevelUpPoint);
                $scope.char['Class'] = parseInt($scope.char.Class);

                $scope.char['class_name'] = get_class_name($scope.char.Class);
                $scope.char['MDate'] = moment($scope.char.MDate).format('DD/MM/YYYY');
                $scope.char['MapName'] = get_map_name(parseInt($scope.char.MapNumber));

            }, function (err) {
                $scope.isServerError = false;
            });
        };

        $scope.saveCharacter = function () {

            var url = SERVER_API + 'admin/updateCharacter';
            var dataUpdate = angular.copy($scope.char);

            delete dataUpdate.Class;
            delete dataUpdate.Lock_Item;
            delete dataUpdate.MDate;
            delete dataUpdate.MapDir;
            delete dataUpdate.MapName;
            delete dataUpdate.MapNumber;
            delete dataUpdate.MapPosX;
            delete dataUpdate.MapPosY;
            delete dataUpdate.Name;
            delete dataUpdate.Online;
            delete dataUpdate.Online_Sub;
            delete dataUpdate.PkCount;
            delete dataUpdate.PkLevel;
            delete dataUpdate.PkTime;
            delete dataUpdate.Relifes;
            delete dataUpdate.Reset_Day;
            delete dataUpdate.Reset_Month;
            delete dataUpdate.SCFMarried;
            delete dataUpdate.SCFMarryHusbandWife;
            delete dataUpdate.Top_0h;
            delete dataUpdate.class_name;
            delete dataUpdate.AccountID;

            var data = {
                account: $scope.char.AccountID,
                name: $scope.char.Name,
                dataUpdate: dataUpdate
            }
            $http.post(url, data, set_header(), {
                withCredentials: true
            }).then(function (response) {
                $scope.char = response.data.data[0];

                $scope.char['Money'] = parseInt($scope.char.Money);
                $scope.char['Resets'] = parseInt($scope.char.Resets);
                $scope.char['cLevel'] = parseInt($scope.char.cLevel);
                $scope.char['Strength'] = parseInt($scope.char.Strength);
                $scope.char['Dexterity'] = parseInt($scope.char.Dexterity);
                $scope.char['Energy'] = parseInt($scope.char.Energy);
                $scope.char['Leadership'] = parseInt($scope.char.Leadership);
                $scope.char['Vitality'] = parseInt($scope.char.Vitality);
                $scope.char['LevelUpPoint'] = parseInt($scope.char.LevelUpPoint);
                $scope.char['Class'] = parseInt($scope.char.Class);

                $scope.char['class_name'] = get_class_name($scope.char.Class);
                $scope.char['MDate'] = moment($scope.char.MDate).format('DD/MM/YYYY');
                $scope.char['MapName'] = get_map_name(parseInt($scope.char.MapNumber));
                
                toastr.success(response.data.message, {
                    closeButton: true
                });
            }, function (err) {
                $scope.isServerError = false;
            });
        }

    }
})();