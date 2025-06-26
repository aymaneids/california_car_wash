import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryTracking = ({ inventory = [] }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const getStatusInfo = (item) => {
    const currentStock = item?.currentStock || 0;
    const minStock = item?.minStock || 0;
    
    if (currentStock === 0) {
      return { status: 'out-of-stock', color: 'bg-error-50 text-error border-error-200', label: 'Out of Stock' };
    } else if (currentStock <= minStock) {
      return { status: 'low', color: 'bg-warning-50 text-warning border-warning-200', label: 'Low Stock' };
    } else if (currentStock <= minStock * 2) {
      return { status: 'medium', color: 'bg-warning-50 text-warning border-warning-200', label: 'Medium Stock' };
    } else {
      return { status: 'good', color: 'bg-success-50 text-success border-success-200', label: 'Good Stock' };
    }
  };

  const filteredInventory = inventory?.filter(item => {
    if (filterStatus === 'all') return true;
    const statusInfo = getStatusInfo(item);
    return statusInfo.status === filterStatus;
  }) || [];

  const inventoryStats = {
    total: inventory?.length || 0,
    lowStock: inventory?.filter(item => getStatusInfo(item).status === 'low').length || 0,
    outOfStock: inventory?.filter(item => getStatusInfo(item).status === 'out-of-stock').length || 0,
    goodStock: inventory?.filter(item => getStatusInfo(item).status === 'good').length || 0
  };

  const handleReorder = (itemId) => {
    // In a real app, this would trigger a reorder process
    console.log(`Reordering item ${itemId}`);
  };

  const handleUpdateStock = (itemId, newStock) => {
    // In a real app, this would update the stock level
    console.log(`Updating stock for item ${itemId} to ${newStock}`);
  };

  return (
    <div className="space-y-6">
      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Items', value: inventoryStats.total, icon: 'Package', color: 'text-primary' },
          { title: 'Good Stock', value: inventoryStats.goodStock, icon: 'CheckCircle', color: 'text-success' },
          { title: 'Low Stock', value: inventoryStats.lowStock, icon: 'AlertTriangle', color: 'text-warning' },
          { title: 'Out of Stock', value: inventoryStats.outOfStock, icon: 'XCircle', color: 'text-error' }
        ].map((stat, index) => (
          <div key={index} className="bg-background rounded-xl border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {stat.value}
                </p>
              </div>
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Controls */}
      <div className="bg-background rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Items</option>
                <option value="good">Good Stock</option>
                <option value="medium">Medium Stock</option>
                <option value="low">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Download">
              Export Report
            </Button>
            <Button variant="primary" iconName="Plus">
              Add Item
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory List */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">
              Inventory Items
            </h3>
            <p className="text-sm text-text-secondary">
              {filteredInventory.length} items found
            </p>
          </div>
          
          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => {
                const statusInfo = getStatusInfo(item);
                return (
                  <div 
                    key={item.id}
                    className={`p-4 cursor-pointer hover:bg-surface transition-colors duration-200 ${
                      selectedItem?.id === item.id ? 'bg-primary-50 border-r-2 border-r-primary' : ''
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          {item?.item || 'Unknown Item'}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          Current: {item?.currentStock || 0} | Min: {item?.minStock || 0}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded border mt-1 ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-semibold text-text-primary">
                          {item?.currentStock || 0}
                        </p>
                        <p className="text-xs text-text-secondary">
                          in stock
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <Icon name="Package" size={48} className="text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  No items found
                </h3>
                <p className="text-text-secondary">
                  {filterStatus === 'all' ?'Start by adding your first inventory item.' :'No items match the selected filter.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Item Details */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">
              Item Details
            </h3>
          </div>
          
          {selectedItem ? (
            <div className="p-6 space-y-6">
              {/* Item Info */}
              <div>
                <h4 className="text-xl font-semibold text-text-primary mb-2">
                  {selectedItem?.item || 'Unknown Item'}
                </h4>
                
                {(() => {
                  const statusInfo = getStatusInfo(selectedItem);
                  return (
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded border ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  );
                })()}
              </div>

              {/* Stock Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface rounded-lg p-4">
                  <p className="text-sm text-text-secondary">Current Stock</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {selectedItem?.currentStock || 0}
                  </p>
                </div>
                <div className="bg-surface rounded-lg p-4">
                  <p className="text-sm text-text-secondary">Minimum Stock</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {selectedItem?.minStock || 0}
                  </p>
                </div>
              </div>

              {/* Stock Level Visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Stock Level</span>
                  <span className="text-text-primary font-medium">
                    {selectedItem?.currentStock || 0} / {(selectedItem?.minStock || 0) * 3} (target)
                  </span>
                </div>
                <div className="w-full bg-surface rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      (selectedItem?.currentStock || 0) <= (selectedItem?.minStock || 0)
                        ? 'bg-error'
                        : (selectedItem?.currentStock || 0) <= (selectedItem?.minStock || 0) * 2
                        ? 'bg-warning' :'bg-success'
                    }`}
                    style={{ 
                      width: `${Math.min(((selectedItem?.currentStock || 0) / ((selectedItem?.minStock || 0) * 3)) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Last Restocked */}
              <div className="bg-surface rounded-lg p-4">
                <p className="text-sm text-text-secondary">Last Restocked</p>
                <p className="font-medium text-text-primary">
                  {selectedItem?.lastRestocked || 'Never'}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  iconName="RefreshCw"
                  fullWidth
                  onClick={() => handleReorder(selectedItem.id)}
                >
                  Reorder Item
                </Button>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    iconName="Plus"
                    className="flex-1"
                    onClick={() => handleUpdateStock(selectedItem.id, (selectedItem?.currentStock || 0) + 10)}
                  >
                    Add 10
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Minus"
                    className="flex-1"
                    onClick={() => handleUpdateStock(selectedItem.id, Math.max(0, (selectedItem?.currentStock || 0) - 10))}
                  >
                    Remove 10
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Icon name="Package" size={48} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Select an Item
              </h3>
              <p className="text-text-secondary">
                Choose an inventory item from the list to view details and manage stock levels.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Low Stock Alerts */}
      {inventoryStats.lowStock > 0 && (
        <div className="bg-warning-50 border border-warning-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="AlertTriangle" size={24} className="text-warning" />
            <h3 className="text-lg font-semibold text-warning">
              Low Stock Alert
            </h3>
          </div>
          
          <p className="text-warning-700 mb-4">
            {inventoryStats.lowStock} item(s) are running low and need to be restocked soon.
          </p>
          
          <div className="space-y-2">
            {inventory?.filter(item => getStatusInfo(item).status === 'low').map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-background rounded-lg p-3">
                <span className="font-medium text-text-primary">
                  {item?.item || 'Unknown Item'}
                </span>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-text-secondary">
                    {item?.currentStock || 0} remaining
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="RefreshCw"
                    onClick={() => handleReorder(item.id)}
                  >
                    Reorder
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTracking;