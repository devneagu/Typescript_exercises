class Speaker {
  private message: string;
  constructor(private name: string) {}
  get Message() {
    if (!this.message.includes(this.name)) {
      throw Error("message is missing speaker name");
    }
    return this.message;
  }
  set Message(val: string) {
    let tmpMessage = val;
    if (!val.includes(this.name)) {
      tmpMessage = this.name + " " + val;
    }
    this.message = tmpMessage;
  }
}

const speaker = new Speaker("john");
speaker.Message = "hello";
console.log(speaker.Message);

//static and methods

class ClassA {
  static typeName: string;
  constructor() {}

  static getFullName() {
    return "ClassA" + ClassA.typeName;
  }
}

const a = new ClassA();
console.log(ClassA.typeName);

//static is usefull when it's needed to share data across class instances

class Runner {
  static lastRunTypeName: string;
  constructor(private typeName: string) {}

  run() {
    this.lastRunTypeName = this.typeName;
  }
}
const a = new Runner("a");
const b = new Runner("b");
a.run();
b.run();
console.log(b.lastRunTypeName);

//interfaces
//are set of rules to get any work done.
interface Employee {
  name: string;
  id: number;
  isManager: boolean;
  getUniqueId: () => string;
}
const linda: Employee = {
  name: "linda",
  id: 2,
  isManager: false,
  getUniqueId: (): string => {
    let uniqueId = linda.id + "-" + linda.name;
    if (!linda.isManager) {
      return "emp-" + uniqueId;
    }
    return uniqueId;
  }
};
const pam: Employee = {
  name: "pam",
  id: 1,
  isManager: true,
  getUniqueId: (): string => {
    let uniqueId = pam.id + "-" + pam.name;
    if (pam.isManager) {
      return "mgr-" + uniqueId;
    }
    return uniqueId;
  }
};
console.log(linda.getUniqueId());
console.log(pam.getUniqueId());

//interfaces are useful if we need similar objects but with different implementations;

//inheritance
class Vehicle {
  constructor(private wheelCount: number) {}

  showNumberOffWheels() {
    console.log(`Moved ${this.wheelCount} miles.`);
  }
}

class Motorcycle extends Vehicle {
  constructor() {
    super(2);
  }
}
class Automobile extends Vehicle {
  constructor() {
    super(4);
  }
}

const motorCycle = new Motorcycle();
motorCycle.showNumberOffWheels();
const autoMobile = new Automobile();
autoMobile.showNumberOffWheels();

//inheritance protected type can be passed to extended objects,

class Vehicle {
  constructor(protected wheelCount: number) {}

  showNumberOffWheels() {
    console.log(`Moved ${this.wheelCount} miles.`);
  }
}

class Motorcycle extends Vehicle {
  constructor() {
    super(2);
  }
  updateWheelCount(newWheelCount: number) {
    this.wheelCount = newWheelCount;
  }
}
class Automobile extends Vehicle {
  constructor() {
    super(4);
  }
}

const motorCycle = new Motorcycle();
motorCycle.showNumberOffWheels();
const autoMobile = new Automobile();
autoMobile.showNumberOffWheels();

namespace InterfaceNamespace {
  interface Thing {
    name: string;
    getFullName: () => string;
  }
  interface Vehicle extends Thing {
    wheelCount: string;
    updateWheelCount: (newWheelCount: number) => void;
    showNumberOfWheels: () => void;
  }

  class Motorcycle implements Vehicle {
    name: string;
    wheelCount: number;
    constructor(name: string) {
      this.name = name;
    }
    updateWheelCount(newWheelCount: number) {
      this.wheelCount = newWheelCount;
      console.log(`Automobile has ${this.wheelCount}`);
    }
    showNumberOfWheels() {
      console.log(`moved automobile ${this.wheelCount} miles`);
    }
    getFullName() {
      return "MC" + this.name;
    }
  }

  const moto = new Motorcycle("beginner-cycle");
  console.log(moto.getFullName());
}

//generics
//type definition to include an associated type that can be chosen by the user
//of the generic type
//Generics will defineltyl come into play later;

//T - expect any Type
// function getLength<T>(arg: T): number {
//   if (arg.hasOwnProperty("length")) {
//     return arg["length"];
//   }
//   return 0;
// }

interface HasLength {
  length: number;
}
//this means that the value we receive has to have .length, otherwise it wont work to run it
function getLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

console.log(getLength<number>(22));
console.log(getLength("hello world"));

namespace GenericNamespace {
  interface Wheels {
    count: number;
    diameter: number;
  }
  interface Vehicle<T> {
    getName(): string;
    getWheelCount: () => T;
  }
  class Automobile implements Vehicle<Wheels> {
    constructor(private name: string, private wheels: Wheels) {}
    getName(): string {
      return this.name;
    }
    getWheelCount(): Wheels {
      return this.wheels;
    }
  }
  class Chevy extends Automobile {
    constructor() {
      super("Chevy", { count: 4, diameter: 10 });
    }
  }

  const chevy = new Chevy();
  console.log("car name ", chevy.getName());
  console.log("wheels", chevy.getWheelCount());
}


//optional Chaining

namespace OptionalChainingNS{
  interface Wheels {
    count ? : number
  }
  class Automobile implements Vehicle {
    constructor(public wheels ?: Wheels){}
  }
  const car: Automobile | null = new Automobile({
    count: undefined;
  })
  console.log('car',car);
  console.log('car wh',car?.wheels)
  console.log('car co',car?.wheels?.count)
}

//nullish coalescing

const val1 = undefined;
const val2 = 10;

const result = val1 && val2;
console.log(val2);