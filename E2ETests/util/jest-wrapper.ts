import waitForExpect from "wait-for-expect";

waitForExpect.defaults.timeout = 30000;
waitForExpect.defaults.interval = 5000;

export async function waitForAssertion(assertion: () => Promise<void> | void): Promise<void> {
    await waitForExpect(async () => {
      await assertion();
    });
  }
  
export function toContainObject(received: any, argument:any) {
      const pass = this.equals(received, 
        expect.arrayContaining([
          expect.objectContaining(argument)
        ])
      )
  
      if (pass) {
        return {
          message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
          pass: true
        }
      } else {
        return {
          message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
          pass: false
        }
      }
    }
  