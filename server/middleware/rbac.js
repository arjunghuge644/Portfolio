const ROLE_PERMISSIONS = {
  SUPER_ADMIN: ['*'],
  ADMIN: [
    'view_dashboard',
    'manage_projects',
    'publish_articles',
    'delete_content',
    'view_messages',
    'audit_logs'
  ],
  EDITOR: [
    'view_dashboard',
    'manage_projects',
    'publish_articles'
  ]
};

export function requireRole(allowedRoles = ['SUPER_ADMIN', 'ADMIN']) {
  return (req, res, next) => {
    const userRole = req.adminUser && req.adminUser.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        error: 'FORBIDDEN',
        message: `Insufficient permissions. Access restricted to roles: ${allowedRoles.join(', ')}`
      });
    }

    next();
  };
}
