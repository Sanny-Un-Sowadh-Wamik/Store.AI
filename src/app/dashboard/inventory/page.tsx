"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Package, Search, Plus, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const inventoryItems = [
  {
    id: "1",
    name: "Espresso Beans (1kg)",
    sku: "COF-ESP-1KG",
    category: "Coffee",
    quantity: 45,
    reorderPoint: 20,
    cost: 24.99,
    price: 34.99,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Oat Milk (1L)",
    sku: "MLK-OAT-1L",
    category: "Dairy",
    quantity: 8,
    reorderPoint: 15,
    cost: 3.49,
    price: 4.99,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Croissants (6-pack)",
    sku: "PST-CRO-6PK",
    category: "Pastries",
    quantity: 24,
    reorderPoint: 10,
    cost: 8.99,
    price: 14.99,
    status: "In Stock",
  },
  {
    id: "4",
    name: "Vanilla Syrup (750ml)",
    sku: "SYR-VAN-750",
    category: "Syrups",
    quantity: 3,
    reorderPoint: 5,
    cost: 12.99,
    price: 18.99,
    status: "Low Stock",
  },
  {
    id: "5",
    name: "Paper Cups (100-pack)",
    sku: "SUP-CUP-100",
    category: "Supplies",
    quantity: 0,
    reorderPoint: 10,
    cost: 15.99,
    price: 0,
    status: "Out of Stock",
  },
  {
    id: "6",
    name: "Whole Milk (1L)",
    sku: "MLK-WHO-1L",
    category: "Dairy",
    quantity: 32,
    reorderPoint: 20,
    cost: 2.49,
    price: 3.49,
    status: "In Stock",
  },
];

const lowStockCount = inventoryItems.filter((i) => i.status === "Low Stock").length;
const outOfStockCount = inventoryItems.filter((i) => i.status === "Out of Stock").length;

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500">Manage your stock levels and products</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold">{inventoryItems.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Stock</p>
                <p className="text-2xl font-bold">
                  {inventoryItems.filter((i) => i.status === "In Stock").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800">
                <strong>{lowStockCount + outOfStockCount} items</strong> need attention.{" "}
                {outOfStockCount > 0 && `${outOfStockCount} out of stock. `}
                {lowStockCount > 0 && `${lowStockCount} running low.`}
              </p>
              <Button size="sm" variant="outline" className="ml-auto">
                Reorder Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Products</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search products..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-gray-500">Product</th>
                  <th className="pb-3 font-medium text-gray-500">SKU</th>
                  <th className="pb-3 font-medium text-gray-500">Category</th>
                  <th className="pb-3 font-medium text-gray-500">Quantity</th>
                  <th className="pb-3 font-medium text-gray-500">Cost</th>
                  <th className="pb-3 font-medium text-gray-500">Status</th>
                  <th className="pb-3 font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4 font-medium">{item.name}</td>
                    <td className="py-4 text-gray-500 font-mono text-sm">{item.sku}</td>
                    <td className="py-4 text-gray-600">{item.category}</td>
                    <td className="py-4">
                      <span
                        className={
                          item.quantity <= item.reorderPoint ? "text-red-600 font-medium" : ""
                        }
                      >
                        {item.quantity}
                      </span>
                      <span className="text-gray-400 text-sm"> / {item.reorderPoint} min</span>
                    </td>
                    <td className="py-4">{formatCurrency(item.cost)}</td>
                    <td className="py-4">
                      <Badge
                        variant={
                          item.status === "In Stock"
                            ? "success"
                            : item.status === "Low Stock"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
