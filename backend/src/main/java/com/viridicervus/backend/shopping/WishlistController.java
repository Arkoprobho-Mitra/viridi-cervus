package com.viridicervus.backend.shopping;

import com.viridicervus.backend.shopping.dto.WishlistRequest;
import com.viridicervus.backend.product.Product;
import com.viridicervus.backend.product.ProductRepository;
import com.viridicervus.backend.user.User;
import com.viridicervus.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getWishlist(@PathVariable Long userId) {
        return ResponseEntity.of(wishlistRepository.findByUserId(userId));
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<?> addToWishlist(@PathVariable Long userId, @RequestBody WishlistRequest request) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty())
            return ResponseEntity.badRequest().body("User not found");

        Wishlist wishlist = wishlistRepository.findByUserId(userId).orElseGet(() -> {
            Wishlist newWishlist = new Wishlist();
            newWishlist.setUser(userOpt.get());
            return wishlistRepository.save(newWishlist);
        });

        Product product = productRepository.findById(request.getProductId()).orElseThrow();

        boolean exists = wishlist.getItems().stream()
                .anyMatch(item -> item.getProduct().getId().equals(product.getId()));

        if (!exists) {
            WishlistItem newItem = new WishlistItem();
            newItem.setWishlist(wishlist);
            newItem.setProduct(product);
            wishlist.getItems().add(newItem);
        }

        return ResponseEntity.ok(wishlistRepository.save(wishlist));
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        Optional<Wishlist> wishlistOpt = wishlistRepository.findByUserId(userId);
        if (wishlistOpt.isPresent()) {
            Wishlist wishlist = wishlistOpt.get();
            wishlist.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
            return ResponseEntity.ok(wishlistRepository.save(wishlist));
        }
        return ResponseEntity.notFound().build();
    }
}
