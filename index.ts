import { from, of } from 'rxjs';
import { delay, map, mergeAll, mergeMap } from 'rxjs/operators';

// lets create our data first
const data = of([
  {
    brand: 'porsche',
    model: '911',
  },
  {
    brand: 'porsche',
    model: 'macan',
  },
  {
    brand: 'ferarri',
    model: '458',
  },
  {
    brand: 'lamborghini',
    model: 'urus',
  },
]);

const nameArr = from(['Rajan', 'Amit', 'Aakash', 'Chintan']);

data.subscribe((res) => console.log(res));

nameArr.subscribe((res) => console.log(res));

const getData = (params) => {
  return of('My name is' + ' ' + params);
  // return of('My car is' + ' ' + params.brand + ' ' + params.model);
};

nameArr
  .pipe(
    mergeMap((cars) => {
      console.log('cars', cars);
      return getData(cars);
    })
  )
  .subscribe((data) => {
    console.log(22, data);
  });

// get data as brand+model string. Result:
// ["porsche 911", "porsche macan", "ferarri 458", "lamborghini urus"]
data
  .pipe(map((cars) => cars.map((car) => `${car.brand} ${car.model}`)))
  .subscribe((cars) => console.log(cars));

// filter data so that we only have porsches. Result:
// [
//   {
//     brand: 'porsche',
//     model:

('911');
//   },
//   {
//     brand: 'porsche',
//     model: 'macan'
//   }
// ]
data
  .pipe(map((cars) => cars.filter((car) => car.brand === 'porsche')))
  .subscribe((cars) => console.log(cars));

const getData2 = (param) => {
  return of(`retrieved new data with param ${param}`).pipe(delay(1000));
};

from([1, 2, 3, 4])
  .pipe(
    map((param) => getData2(param)),
    mergeAll()
  )
  .subscribe((val) => console.log(val));
