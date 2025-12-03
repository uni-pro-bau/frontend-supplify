import * as React from 'react';
import { cn } from '../../lib/utils.js';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-3xl border border-gray-100 bg-white shadow-card', className)} {...props} />
));
Card.displayName = 'Card';

const CardHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col gap-1 p-8', className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h3 className={cn('text-2xl font-semibold text-purple-900', className)} {...props} />
);

const CardDescription = ({ className, ...props }) => (
  <p className={cn('text-sm text-gray-500', className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn('p-8 pt-0', className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent };

