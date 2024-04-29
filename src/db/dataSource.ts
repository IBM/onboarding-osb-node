import DataSourceProd from './dataSourceProd'
import DataSourceLocal from './dataSourceLocal'

export default process.env.NODE_ENV === 'production'
  ? DataSourceProd
  : DataSourceLocal
