/* global test, describe, jest, it */

const axios = jest.genMockFromModule('axios');

// Mock storage
const actions = {};

/**
 * Adapter to fill the mocked calls.
 * The result have to have a Promise structure. Over that you can take binding call result activities.
 *
 * Usage:
 *
 *  import { mockAxiosAction } from 'axios';
 *
 *  describe('mean full text' function onMeanFullDescribe() {
 *    it('Do mean full stuff', function onMeanFullStuff() {
 *      let bound = null;
 *      const promise = {
 *        then:  function onThen() { return promise; },
 *        catch: function onCatch(callback) {
 *          bound = callback;
 *        }
 *      };
 *
 *      mockAxiosAction(
 *       'get',
 *        function onRequest(url, data, settings) {
 *          expect(url).toBe("http://www.google.de");
 *
 *          return promise;
 *        }
 *      );
 *
 *      // Test object which uses axios
 *      let testObject = new TestObject();
 *      testObject.doLoadGoogle();
 *
 *      // run reject callback
 *      expect(bound).not.toBeNull());
 *      bound({response:{status: 400, data: "error message"}}); // --> start fail actions of Test Object
 *
 *      expect(testObject.success).toBe(false);
 *
 *    });
 *  });
 *
 * @param {string} method Axios action.
 * @param {Function} callback The callback for the moment, that request will send.
 */
export function mockAxiosAction (method, callback) {
  if (!actions.hasOwnProperty(method)) {
    actions[method] = [];
  }

  actions[method].push(callback);
}

/**
 * Action wrapper for axios actions.
 *
 * @param {string} method
 * @returns {Function}
 */
function runAction (method) {
  /**
   * Wrap the action method.
   */
  return function axiosWrapper () {
    // Create dummy, if no mock has been set
    if (!actions.hasOwnProperty(method) || actions[method].length === 0) {
      return new Promise(function () {});
    }

    /**
     * Run action.
     * Pass through the arguments of the action to callback and return predefined result.
     * Result must be a Promise or Promise structured object.
     */
    let action = actions[method].shift();
    return action.apply(this, arguments);
  };
}

// Wrap actions
axios.get  = runAction('get');
axios.put  = runAction('put');
axios.post = runAction('post');

export default axios;
