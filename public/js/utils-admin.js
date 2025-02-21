function deleteUser(userId) {
  if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
      fetch(`/admin/${userId}`, { method: 'DELETE' })
      .then(document.getElementById(`row-${userId}`).remove())
  }
}