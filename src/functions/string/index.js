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
    if (validate.required) {
      if (!onData[key].val) {
        fail += 1;
        const message = 'Please insert this field';
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

      if (validate.min !== '' && validate.min != null) {
        if (onData[key].val.length < validate.min) {
          fail += 1;
          const message = `Not less than of ${validate.min} characters`;
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
      }

      if (validate.max !== '' && validate.max != null) {
        if (onData[key].val.length > validate.max) {
          fail += 1;
          const message = `Not greater than of ${validate.max} characters`;
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
      }
    }

    if (fail >= 1) {
      rej(response);
    }

    res(response);
  });
};
