const inNumber = /^[0-9.]+$/;

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
    const numberer = () => {
      if (typeof onData[key].val !== 'number') {
        if (!onData[key].val.match(inNumber)) {
          fail += 1;
          const message = 'Only number types are allowed';
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
          if (onData[key].val < validate.min) {
            fail += 1;
            const message = `Not less than of ${validate.min}`;
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

      if (validate.max !== '' && validate.max != null) {
        if (onData[key].val > validate.max) {
          fail += 1;
          const message = `Not greater than of ${validate.max}`;
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
    };

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
      } else {
        numberer();
      }
    } else if (onData[key].val) {
      numberer();
    }

    if (fail >= 1) {
      rej(response);
    }

    res(response);
  });
};
