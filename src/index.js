/* eslint-disable no-restricted-globals */
import {
  inGeolocation,
  inString,
  inNumber,
  inImage,
  inEmail,
  inPhone
} from "./functions";

export default (data = {}, need = {}, state = { formName: "", self }) => {
  return new Promise((res, rej) => {
    const run = async () => {
      let fail = 0;
      const fixData = data;
      let response = {};
      const promise1 = Object.keys(fixData).map(async key => {
        const promise2 = Object.keys(need).map(async validate => {
          if (key === validate) {
            if (need[validate].type === "geolocation") {
              try {
                await inGeolocation(need[validate], data, key, state);
              } catch (e) {
                fail += 1;
                response = {
                  ...response,
                  [key]: e
                };
              }
            }

            if (need[validate].type === "image") {
              try {
                await inImage(need[validate], data, key, state);
              } catch (e) {
                fail += 1;
                response = {
                  ...response,
                  [key]: e
                };
              }
            }

            if (need[validate].type === "string") {
              try {
                await inString(need[validate], data, key, state);
              } catch (e) {
                fail += 1;
                response = {
                  ...response,
                  [key]: e
                };
              }
            }

            if (need[validate].type === "number") {
              try {
                await inNumber(need[validate], data, key, state);
              } catch (e) {
                fail += 1;
                response = {
                  ...response,
                  [key]: e
                };
              }
            }

            if (need[validate].type === "phone") {
              try {
                await inPhone(need[validate], data, key, state);
              } catch (e) {
                fail += 1;
                response = {
                  ...response,
                  [key]: e
                };
              }
            }

            if (need[validate].type === "email") {
              try {
                await inEmail(need[validate], data, key, state);
              } catch (e) {
                fail += 1;
                response = {
                  ...response,
                  [key]: e
                };
              }
            }
          }
        });

        await Promise.all(promise2);
      });

      await Promise.all(promise1);

      if (fail >= 1) {
        const err = {
          status: false,
          output: response
        };

        rej(err);
      }

      res({
        status: true
      });
    };

    run();
  });
};
