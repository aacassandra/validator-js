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
    const imager = () => {
      const file = onData[key].val;
      let FileName = file.name;

      const FileMime = FileName.substring(FileName.lastIndexOf('.') + 1).toLowerCase();
      const FileSize = file.size;
      if (file) {
        FileName = FileName.replace(`.${FileMime}`, '');
        // 50000 == 50kB
        if (FileMime === 'png' || FileMime === 'jpeg' || FileMime === 'jpg') {
          if (validate.max_kb && FileSize >= validate.max_kb * 1000) {
            fail += 1;
            const message = `Image file not greater than of ${validate.max_kb} kb`;
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
        } else {
          fail += 1;
          const message = 'Only image file are allowed.';
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
        const message = 'Please upload an image file';
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
        imager();
      }
    } else if (onData[key].val) {
      imager();
    }

    if (fail >= 1) {
      rej(response);
    }

    res(response);
  });
};
