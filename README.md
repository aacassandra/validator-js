# @aacassandra/validator-js

The easiest ways with nodejs project like a Vue JS, React JS, Angular JS and many others for form validator

## Getting Started

If you want constribute for this project, you can clone / fork this project. The main source code available at /src directory. read more about development

### Features

While this time, the validator only support and tested on Vue JS:

- string
- number
- phone
- email
- image
- geolocation

### Installing

Install this in your project root directories.

```
npm i @aacassandra/validator-js
```

### Usage

Below is an example of how to use this plugin. for the first, you must prepare an object, where the object will be used to store values from forms with different object formats such as string, number, email, and many others

1. String, Number, Email & Phone
   ```
   {
       val:'',
       alert: {
           enabled: false,
           message: ''
       }
   }
   ```
2. Image
   ```
   {
       val: '',  //files[0] from input type file
       src: '',  //optional, if the url image has already
       alert: {
           enabled: false,
           message: ''
       }
   }
   ```
3. Geolocation
   ```
   {
       val: {
           lat: 0,
           lon: 0
       },
       alert: {
           enabled: false,
           message: ''
       }
   }
   ```

after making an object for storing the values of form, now you can validate with following this code.

```
    import Validator from '@aacassandra/validator-js'

    const validate = Validator(Data.form, {
      picture: { type: 'image', max_kb: 500 },
      name: { type: 'string', min:0, max:10, required: true },
      phone: { type: 'phone', required: true },
      email: { type: 'string', required: true },
      price: { type: 'number', min:0, max:20 }
    });

    if (validate.status) {
        //has success
    }else{
        //has fail
    }
```

### Development

Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (git checkout -b improve-feature)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (git commit -am 'Improve feature')
- Push to the branch (git push origin improve-feature)
- Create a Pull Request

## License

```
Copyright (c) 2019 Alauddin Afif Cassandra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

```

readmore about license [LICENSE](https://github.com/aacassandra/validator-js#LICENSE)
