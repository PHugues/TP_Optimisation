'use strict'

const Store = require('electron-store');

/**
 * Class used to store a JSON Object in the LocalStorage.
 * @extends Store
 */
class DataStore extends Store {
    
    /**
     * Constructor for a DataStore.
     * @param {Object} settings Parameters for the mother class
     * @param {String} settings.name Name for the entity to save in the LocalStorage
     */
    constructor(settings) {
        super(settings);

        // Initialize with the store with the object retrieved from the LocalStorage if 
        // There is any, otherwise, initialize an empty object
        this.object = this.get(settings.name) || {};
        this.name = settings.name;
    }

    /**
     * Save the object loaded in the store in the LocalStorage
     */
    saveObject() {
        // Save the object to a JSON File in the LocalStorage
        this.set(this.name, this.object);

        // Returning 'this' allows method chaining
        return this;
    }

    /**
     * Get the object from the LocalStorage.
     */
    getObject() {
        // Get the object from the JSON File located in the LocalStorage
        this.object = this.get(this.name) || {};

        return this;
    }

    /**
     * Modify the object stored in the LocalStorage.
     * @param {*} object New object to store
     */
    setObject(object) {
        // Set the Object
        this.object = object;

        return this.saveObject();
    }

    /**
     * Delete the object stored in the LocalStorage.
     */
    deleteObject() {
        this.object = {};

        return this.saveObject();
    }
}

module.exports = DataStore;