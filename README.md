# Elgentos_LocalStorageVersioning

We've encountered some weird bugs where flushing the localStorage resolved issues (particularly in the checkout but also with the gallery on product pages). These bugs were hard to diagnose and only occurred on machines that have visted the site before.

This little extension adds a Javascript file that checks the deployed version. If the deployed version (found in `/static/deployed_version.txt`) is newer than the last versioned localStorage (which is saved in a cookie), the localStorage is cleared. This should alleviate some issues in certain cases.
