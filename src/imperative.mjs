import setupGetEmployee from './imperative/get_employee.mjs';
import setupPostEmployee from './imperative/post_employee.mjs';
import setupPatchEmployee from './imperative/patch_employee';
import setupDeleteEmployee from './imperative/delete_employee';

import setupGetProduct from './imperative/get_product';
import setupPostProduct from './imperative/post_product';
import setupPatchProduct from './imperative/patch_product';
import setupDeleteProduct from './imperative/delete_product';

export default function(app, db) {
  setupGetEmployee(app, db);
  setupPostEmployee(app, db);
  setupPatchEmployee(app, db);
  setupDeleteEmployee(app, db);

  setupGetProduct(app, db);
  setupPostProduct(app, db);
  setupPatchProduct(app, db);
  setupDeleteProduct(app, db);
}