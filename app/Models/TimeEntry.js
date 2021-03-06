'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const Database = use('Database')
const uuid = require('uuid/v4')

class TimeEntry extends Model {
    static boot () {
        super.boot()
    
        /**
         * A hook to hash the user password before saving
         * it to the database.
         */

        this.addHook('afterCreate', async (TimeEntryInstance) => {
            await TimeEntry.syncLabels(TimeEntryInstance)
        })

        this.addHook('afterSave', async (TimeEntryInstance) => {
            await TimeEntry.syncLabels(TimeEntryInstance)
        })
      }

    labels() {
       return this.belongsToMany('App/Models/Label')
        .pivotTable('time_entry_labels')
        .withTimestamps()
    }

    getLabelIds(labelIds) {
        return JSON.parse(labelIds);
    }

    static async syncLabels(TimeEntryInstance) {
        await Database.table('time_entry_labels').delete({time_entry_id: TimeEntryInstance.id});
        JSON.parse(TimeEntryInstance.label_ids).forEach(async (labelId) => {
            await Database
            .table('time_entry_labels')
            .insert({
                id: uuid(),
                company_id: TimeEntryInstance.company_id,
                user_id: TimeEntryInstance.user_id,
                time_entry_id: TimeEntryInstance.id,
                label_id: labelId
            })
        })
    }

    static customCreationHook(formData, auth) {
        formData.user_id = auth.user.id;
        formData.company_id = auth.user.company_id;
    }
}

module.exports = TimeEntry
