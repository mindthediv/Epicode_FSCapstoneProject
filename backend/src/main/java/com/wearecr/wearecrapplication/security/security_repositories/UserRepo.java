package com.wearecr.wearecrapplication.security.security_repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wearecr.wearecrapplication.security.security_models.User;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    
	Optional<User> findByEmail(String email);

	Optional<User> findByUsernameOrEmail(String username, String email);

	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

    boolean existsById(Long id);
}
