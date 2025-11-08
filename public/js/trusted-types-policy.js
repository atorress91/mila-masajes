(() => {
  const trustedTypesApi = globalThis.trustedTypes;
  const canCreatePolicy = Boolean(trustedTypesApi && typeof trustedTypesApi.createPolicy === 'function');

  if (!canCreatePolicy) {
    return;
  }

  const hasExistingPolicy = typeof trustedTypesApi.getPolicy === 'function' && trustedTypesApi.getPolicy('default');

  if (hasExistingPolicy) {
    return;
  }

  const isEffectivelyEmpty = value => typeof value === 'string' && value.trim() === '';
  const baseOrigin = globalThis.location?.origin;
  const allowedScriptOrigins = baseOrigin ? new Set([baseOrigin]) : new Set();

  trustedTypesApi.createPolicy('default', {
    createHTML(value) {
      if (isEffectivelyEmpty(value)) {
        return '';
      }
      throw new TypeError('Trusted Types: HTML strings are blocked. Use DOM APIs instead.');
    },
    createScriptURL(value) {
      if (!baseOrigin) {
        throw new TypeError('Trusted Types: Unable to resolve base origin.');
      }

      let resolved;
      try {
        resolved = new URL(value, baseOrigin);
      } catch {
        throw new TypeError(`Trusted Types: Script URL "${value}" is invalid.`);
      }

      if (allowedScriptOrigins.has(resolved.origin)) {
        return resolved.toString();
      }

      throw new TypeError(`Trusted Types: Script URL "${value}" is not on the allowlist.`);
    },
  });
})();
