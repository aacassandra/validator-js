/* eslint-disable no-useless-escape */
const inNumber = /^[0-9.]+$/;
const inPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const inMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Index = (data = {}, need = {}) => {
  let fail = 0;
  const fixData = data;
  Object.keys(fixData).forEach(key => {
    Object.keys(need).forEach(validate => {
      if (key === validate) {
        let hasFalse = 0;
        if (need[validate].type === "geolocation") {
          const locater = () => {
            if (fixData[key].val.lat === 0 && fixData[key].val.lon === 0) {
              fail += 1;
              fixData[key].alert = {
                enabled: true,
                message: "Location is not valid"
              };
              hasFalse += 1;
            }
          };

          if (need[validate].required) {
            if (!fixData[key].val) {
              fail += 1;
              fixData[key].alert = {
                enabled: true,
                message: "Please insert location"
              };
              hasFalse += 1;
            } else {
              locater();
            }
          } else if (fixData[key].val) {
            locater();
          }
        }

        if (need[validate].type === "image") {
          const imager = () => {
            const file = fixData[key].val;
            let FileName = file.name;

            const FileMime = FileName.substring(
              FileName.lastIndexOf(".") + 1
            ).toLowerCase();
            const FileSize = file.size;
            if (file) {
              FileName = FileName.replace(`.${FileMime}`, "");
              // 50000 == 50kB
              if (
                FileMime === "png" ||
                FileMime === "jpeg" ||
                FileMime === "jpg"
              ) {
                if (
                  need[validate].max_kb &&
                  FileSize >= need[validate].max_kb * 1000
                ) {
                  fail += 1;
                  fixData[key].alert = {
                    enabled: true,
                    message: `Image file not greater than of ${need[validate].max_kb} kb`
                  };
                  hasFalse += 1;
                }
              } else {
                fail += 1;
                fixData[key].alert = {
                  enabled: true,
                  message: "Only image file are allowed."
                };
                hasFalse += 1;
              }
            }
          };

          if (need[validate].required) {
            if (!fixData[key].val) {
              fail += 1;
              fixData[key].alert = {
                enabled: true,
                message: "Please upload an image file"
              };
              hasFalse += 1;
            } else {
              imager();
            }
          } else if (fixData[key].val) {
            imager();
          }
        }

        if (need[validate].type === "string") {
          if (need[validate].required) {
            if (!fixData[key].val) {
              fail += 1;
              fixData[key].alert = {
                enabled: true,
                message: "Please insert this field"
              };
              hasFalse += 1;
            }

            if (need[validate].min !== "" && need[validate].min != null) {
              if (fixData[key].val.length < need[validate].min) {
                fail += 1;
                fixData[key].alert = {
                  enabled: true,
                  message: `Not less than of ${need[validate].min} characters`
                };
                hasFalse += 1;
              }
            }

            if (need[validate].max !== "" && need[validate].max != null) {
              if (fixData[key].val.length > need[validate].max) {
                fail += 1;
                fixData[key].alert = {
                  enabled: true,
                  message: `Not greater than of ${need[validate].max} characters`
                };
                hasFalse += 1;
              }
            }
          }
        }

        if (need[validate].type === "number") {
          const numberer = () => {
            if (typeof fixData[key].val !== "number") {
              if (!fixData[key].val.match(inNumber)) {
                fail += 1;
                fixData[key].alert = {
                  enabled: true,
                  message: "Only number types are allowed"
                };
                hasFalse += 1;
              }

              if (need[validate].min !== "" && need[validate].min != null) {
                if (fixData[key].val < need[validate].min) {
                  fail += 1;
                  fixData[key].alert = {
                    enabled: true,
                    message: `Not less than of ${need[validate].min}`
                  };
                  hasFalse += 1;
                }
              }
            }

            if (need[validate].max !== "" && need[validate].max != null) {
              if (fixData[key].val > need[validate].max) {
                fail += 1;
                fixData[key].alert = {
                  enabled: true,
                  message: `Not greater than of ${need[validate].max}`
                };
                hasFalse += 1;
              }
            }
          };

          if (need[validate].required) {
            if (!fixData[key].val) {
              fail += 1;
              fixData[key].alert = {
                enabled: true,
                message: "Please insert this field"
              };
              hasFalse += 1;
            } else {
              numberer();
            }
          } else if (fixData[key].val) {
            numberer();
          }
        }

        if (need[validate].type === "phone") {
          const phoner = () => {
            if (!inPhone.test(fixData[key].val)) {
              fail += 1;
              fixData[key].alert = {
                enabled: true,
                message: "Phone number format is invalid"
              };
              hasFalse += 1;
            }
          };

          if (need[validate].required) {
            if (!fixData[key].val) {
              fail += 1;
              fixData[key].alert = {
                enabled: true,
                message: "Please insert a phone number"
              };
              hasFalse += 1;
            } else {
              phoner();
            }
          } else if (fixData[key].val) {
            phoner();
          }
        }

        if (need[validate].type === "email") {
          const mailer = () => {
            if (!inMail.test(fixData[key].val)) {
              fail += 1;
              fixData[key].alert = {
                enabled: true,
                message: "Email address format is invalid"
              };
              hasFalse += 1;
            }
          };

          if (need[validate].required) {
            if (!fixData[key].val) {
              fail += 1;
              fixData[key].alert = {
                enabled: true,
                message: "Please insert an email"
              };
              hasFalse += 1;
            } else {
              mailer();
            }
          } else if (fixData[key].val) {
            mailer();
          }
        }

        if (!hasFalse) {
          fixData[key].alert = {
            enabled: false,
            message: ""
          };
        }
      }
    });
  });

  if (fail >= 1) {
    return {
      status: false,
      output: fixData
    };
  }

  return {
    status: true
  };
};

export default Index;
