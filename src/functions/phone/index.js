/* eslint-disable no-useless-escape */
const inPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export default (validate = {}, data = {}, key = '', state) => {
  let fail = 0;
  const onData = data;
  const { formName } = state;
  const { self } = state;
  let response = {
    enabled: false,
    message: ''
  };
  return new Promise((res, rej) => {
    const phoner = () => {
      if (!inPhone.test(onData[key].val)) {
        fail += 1;
        const message = 'Phone number format is invalid';
        if (!self) {
          onData[key].alert = {
            enabled: true,
            message
          };
        } else {
          self.setState(prev => ({
            [formName]: {
              ...prev[formName],
              [key]: {
                ...prev[formName][key],
                alert: {
                  ...prev[formName][key].alert,
                  enabled: true,
                  message
                }
              }
            }
          }));
        }
        response = {
          enabled: true,
          message
        };
      }
    };

    if (validate.required) {
      if (!onData[key].val) {
        fail += 1;
        const message = 'Please insert a phone number';
        if (!self) {
          onData[key].alert = {
            enabled: true,
            message
          };
        } else {
          self.setState(prev => ({
            [formName]: {
              ...prev[formName],
              [key]: {
                ...prev[formName][key],
                alert: {
                  ...prev[formName][key].alert,
                  enabled: true,
                  message
                }
              }
            }
          }));
        }
        response = {
          enabled: true,
          message
        };
      } else {
        phoner();
      }
    } else if (onData[key].val) {
      phoner();
    }

    if (fail >= 1) {
      rej(response);
    }

    res(response);
  });
};
