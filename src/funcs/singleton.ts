export function singleton<
	T extends new (...args: any[]) => object
>(classCtor: T): T {
	let instance!: InstanceType<T>

	const proxy = new Proxy(classCtor, {
		construct(target, args, newTarget) {
			if (!instance) {
				// Reflect.construct(...) returns 'unknown' by default,
				// so we explicitly cast to InstanceType<T>.
				instance = Reflect.construct(target, args, newTarget) as InstanceType<T>
			}
			// Must return an object, so returning 'instance' is fine.
			return instance
		},
	})

	// If you really need to modify the prototype’s constructor property:
	classCtor.prototype.constructor = proxy

	// Cast the Proxy object back to T so it’s recognized as a valid constructor.
	return proxy as T
}
