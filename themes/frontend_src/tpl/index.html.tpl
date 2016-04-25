<div class="panel panel-default">

    <div class="panel-heading">{{ entityTitle }} <a ui-sref="app.<%= name %>.create">Создать новый</a></div>

    <table class="table">
        <thead>
        <tr>
            <th ng-repeat="item in scheme">{{ item.title }}</th>
            <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="entity in entities">
            <td
                    ng-repeat="(itemName, item) in scheme"
                    linked-entity="linkedEntities[itemName]"
                    atom-list-field
                    scheme="item"
                    field-name="itemName"
                    field="entity[itemName]">
            </td>
            <td>
                <a class="btn-icon btn-icon-min-sm btn-edit" ui-sref="app.<%= name %>.read({_id: entity._id.$id})">
                    <i class="glyphicon glyphicon-pencil ng-scope"></i>
                </a>
                <a class="btn-icon btn-icon-min-sm btn-remove" ng-click="remove(entity._id.$id)">
                    <i class="glyphicon glyphicon-trash"></i>
                </a>
            </td>
        </tr>
        </tbody>
    </table>
</div>