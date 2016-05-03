<form>
    <input type="text" style="position: absolute;left: -1000px;">
    <input type="password" style="position: absolute;left: -1000px;">

    <div class="form-group "  ng-repeat="(itemName, item) in scheme" >
        <label class="col-sm-2" for="{{ itemName }}">{{ item.title }} <span class="require">*</span></label>
        <div
                class="col-sm-10"
                ng-if="item.type === 'string'"
                atom-field-string
                field="entity[itemName]"
                field-name="itemName"
                scheme="item"></div>
        <div
                class="col-sm-10"
                ng-if="item.type === 'password'"
                atom-field-password
                field="entity[itemName]"
                field-name="itemName"
                scheme="item"></div>
        <div
                class="col-sm-10"
                ng-if="item.type === 'boolean'"
                atom-field-boolean
                field="entity[itemName]"
                field-name="itemName"
                scheme="item"></div>
        <div
                class="col-sm-10"
                ng-if="item.type === 'entity'"
                atom-field-entity
                field="entity[itemName]"
                field-name="itemName"
                linked-entity="linkedEntities[item.entity.model]"
                entity-model="entityModels"
                scheme="item"></div>
        <div style="clear: both; margin-bottom: 10px;"></div>
    </div>
</form>
<div style="clear: both;"></div>
<button type="button" ng-click="save()">Save</button>