import { type Writable , writable } from 'svelte/store'


/**
 * Essentialy a struct that holds the value  and a writable that a
 * frontend element can subscribe and listen to and fetch the value from.
 * Reactive variables has a backend type and a frontend type. The backend
 * type is the type of the value whereas the frontend type is the type
 * that the frontend will receive.
 */
export class ReactiveVar< BackendType , FrontendType = string > {
	private store: Writable< FrontendType  >;
	private value:  BackendType  ;

	constructor(
		value:  BackendType ,
		private convert : ( value:  BackendType  ) => FrontendType 
	) {
		this.store = writable(convert(value));
		this.value = value;
	}

	get() :  BackendType   {
		return this.value;
	}

	set(value:  BackendType  ) {
		this.value = value;
		this.store.set(this.convert(value));
	}

	update ( callback: (value:  BackendType  ) =>  BackendType   ) {
		this.value = callback(this.value);
		this.store.set(this.convert(this.value));
	}

	subscribe(callback: (value: any) => void) {
		return this.store.subscribe(callback);
	}
}
