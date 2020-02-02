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
    const locater = () => {
      if (onData[key].val.lat === 0 && onData[key].val.lon === 0) {
        fail += 1;
        const message = 'Location is not valid';
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
        const message = 'Please insert location';
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
        locater();
      }
    } else if (onData[key].val) {
      locater();
    }

    if (fail >= 1) {
      rej(response);
    }

    res(response);
  });
};
